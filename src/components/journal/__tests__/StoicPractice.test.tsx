import { render, screen, fireEvent } from '@testing-library/react';
import { StoicPractice } from '@/components/journal/StoicPractice';

describe('StoicPractice', () => {
  const defaultData = {
    type: 'morning_preparation' as const,
    challengesAnticipated: [''],
    virtuousResponses: [''],
    successes: [''],
    failures: [''],
    lessons: '',
  };

  it('should render morning preparation fields by default', () => {
    const onChange = jest.fn();
    render(<StoicPractice data={defaultData} onChange={onChange} />);
    
    expect(screen.getByText('Stoic Morning Preparation')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What difficulty might arise today?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('How will you respond with wisdom, courage, justice, or temperance?')).toBeInTheDocument();
  });

  it('should switch to evening review when clicking evening button', () => {
    const onChange = jest.fn();
    render(<StoicPractice data={defaultData} onChange={onChange} />);
    
    const eveningButton = screen.getByText('Evening');
    fireEvent.click(eveningButton);
    
    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      type: 'evening_review',
    });
  });

  it('should render evening review fields when type is evening_review', () => {
    const eveningData = { ...defaultData, type: 'evening_review' as const };
    const onChange = jest.fn();
    render(<StoicPractice data={eveningData} onChange={onChange} />);
    
    expect(screen.getByText('Stoic Evening Review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What did you do well today?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Where did you fall short of your values?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What will you do differently tomorrow?')).toBeInTheDocument();
  });

  it('should update lessons text when typing', () => {
    const eveningData = { ...defaultData, type: 'evening_review' as const };
    const onChange = jest.fn();
    render(<StoicPractice data={eveningData} onChange={onChange} />);
    
    const lessonsInput = screen.getByPlaceholderText('What will you do differently tomorrow?');
    fireEvent.change(lessonsInput, { target: { value: 'I will practice patience' } });
    
    expect(onChange).toHaveBeenCalledWith({
      ...eveningData,
      lessons: 'I will practice patience',
    });
  });
});
