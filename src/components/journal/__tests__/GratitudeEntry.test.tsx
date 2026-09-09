import { render, screen, fireEvent } from '@testing-library/react';
import { GratitudeEntry } from '@/components/journal/GratitudeEntry';

describe('GratitudeEntry', () => {
  const defaultData = {
    items: [{ text: '', type: 'thing' as const, detail: '' }],
  };

  it('should render gratitude form fields', () => {
    const onChange = jest.fn();
    render(<GratitudeEntry data={defaultData} onChange={onChange} />);
    
    expect(screen.getByText('Gratitude Practice')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('I am grateful for...')).toBeInTheDocument();
    expect(screen.getByText('+ Add gratitude item')).toBeInTheDocument();
  });

  it('should update gratitude text when typing', () => {
    const onChange = jest.fn();
    render(<GratitudeEntry data={defaultData} onChange={onChange} />);
    
    const input = screen.getByPlaceholderText('I am grateful for...');
    fireEvent.change(input, { target: { value: 'My supportive friends' } });
    
    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      items: [{ text: 'My supportive friends', type: 'thing', detail: '' }],
    });
  });

  it('should add new gratitude item when clicking add button', () => {
    const onChange = jest.fn();
    render(<GratitudeEntry data={defaultData} onChange={onChange} />);
    
    const addButton = screen.getByText('+ Add gratitude item');
    fireEvent.click(addButton);
    
    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      items: [
        { text: '', type: 'thing', detail: '' },
        { text: '', type: 'thing', detail: '' },
      ],
    });
  });

  it('should update gratitude type when selecting different option', () => {
    const onChange = jest.fn();
    render(<GratitudeEntry data={defaultData} onChange={onChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'person' } });
    
    expect(onChange).toHaveBeenCalledWith({
      ...defaultData,
      items: [{ text: '', type: 'person', detail: '' }],
    });
  });
});
