import { render, screen, fireEvent } from '@testing-library/react';
import { CBTThoughtRecord } from '@/components/journal/CBTThoughtRecord';

describe('CBTThoughtRecord', () => {
  const defaultData = {
    situation: '',
    automaticThoughts: [''],
    emotions: [{ name: '', intensity: 5 }],
    evidenceFor: [''],
    evidenceAgainst: [''],
    balancedPerspective: '',
    finalEmotionRating: 5,
  };

  it('should render all CBT form fields', () => {
    const onChange = jest.fn();
    render(<CBTThoughtRecord data={defaultData} onChange={onChange} />);
    
    expect(screen.getByText('CBT Thought Record')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Describe what happened, where you were, and who was involved...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What thought went through your mind?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What evidence supports this thought?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('What evidence contradicts this thought?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Given the evidence for and against, what is a more balanced way to view this situation?')).toBeInTheDocument();
  });

  it('should update situation text when typing', () => {
    const onChange = jest.fn();
    render(<CBTThoughtRecord data={defaultData} onChange={onChange} />);
    
    const situationInput = screen.getByPlaceholderText('Describe what happened, where you were, and who was involved...');
    fireEvent.change(situationInput, { target: { value: 'I had a stressful meeting' } });
    
    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      situation: 'I had a stressful meeting',
    });
  });

  it('should add new automatic thought when clicking add button', () => {
    const onChange = jest.fn();
    render(<CBTThoughtRecord data={defaultData} onChange={onChange} />);
    
    const addButtons = screen.getAllByText('+ Add another');
    fireEvent.click(addButtons[0]);
    
    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      automaticThoughts: ['', ''],
    });
  });

  it('should update emotion intensity when slider changes', () => {
    const onChange = jest.fn();
    render(<CBTThoughtRecord data={defaultData} onChange={onChange} />);
    
    const slider = screen.getAllByRole('slider')[0];
    fireEvent.change(slider, { target: { value: '8' } });
    
    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      emotions: [{ name: '', intensity: 8 }],
    });
  });
});
