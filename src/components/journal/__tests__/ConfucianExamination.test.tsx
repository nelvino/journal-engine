import { render, screen, fireEvent } from '@testing-library/react';
import { ConfucianExamination } from '@/components/journal/ConfucianExamination';

describe('ConfucianExamination', () => {
  const defaultData = {
    loyaltyRating: 5,
    loyaltyNotes: '',
    trustworthinessRating: 5,
    trustworthinessNotes: '',
    practiceRating: 5,
    practiceNotes: '',
  };

  it('should render three Confucian dimensions', () => {
    const onChange = jest.fn();
    render(<ConfucianExamination data={defaultData} onChange={onChange} />);

    expect(screen.getByText('Confucian Self-Examination')).toBeInTheDocument();
    expect(screen.getByText('Loyalty / Devotion (忠, zhōng)')).toBeInTheDocument();
    expect(screen.getByText('Trustworthiness (信, xìn)')).toBeInTheDocument();
    expect(screen.getByText('Practice / Learning (習, xí)')).toBeInTheDocument();
  });

  it('should update notes when typing', () => {
    const onChange = jest.fn();
    render(<ConfucianExamination data={defaultData} onChange={onChange} />);

    const noteInputs = screen.getAllByPlaceholderText('What did you do well? Where can you improve?');
    fireEvent.change(noteInputs[0], { target: { value: 'I supported my team today' } });

    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      loyaltyNotes: 'I supported my team today',
    });
  });

  it('should update rating when slider changes', () => {
    const onChange = jest.fn();
    render(<ConfucianExamination data={defaultData} onChange={onChange} />);

    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '8' } });

    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      loyaltyRating: 8,
    });
  });
});
