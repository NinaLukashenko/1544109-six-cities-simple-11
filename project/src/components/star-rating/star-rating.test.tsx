import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StarRating } from './star-rating';

const fakeOnRateChange = jest.fn();
const mockValue = 5;
const mockTitle = 'perfect';

describe('Component: StarRating', () => {
  it('should render correctly if isChecked/isDisabled = "FALSE"', () => {
    render(
      <StarRating
        value={mockValue}
        title={mockTitle}
        isChecked={false}
        isDisabled={false}
        onRateChange={fakeOnRateChange}
      />
    );

    const inputElement = screen.getByRole('radio');
    const labelElement = screen.getByTestId('label');
    const svgElement = screen.getByTestId('image');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.getAttribute('value')).toEqual(mockValue.toString());
    expect(inputElement.getAttribute('id')).toEqual(`${mockValue}-stars`);
    expect(inputElement).not.toBeChecked();

    expect(labelElement).toBeInTheDocument();
    expect(labelElement.getAttribute('for')).toEqual(`${mockValue}-stars`);
    expect(labelElement.getAttribute('style')).toEqual('pointer-events: auto;');
    expect(labelElement.getAttribute('title')).toEqual(mockTitle);

    expect(svgElement).toBeInTheDocument();
  });

  it('should render correctly if isChecked/isDisabled = "TRUE"', () => {
    render(
      <StarRating
        value={mockValue}
        title={mockTitle}
        isChecked
        isDisabled
        onRateChange={fakeOnRateChange}
      />
    );

    expect(screen.getByRole('radio')).toBeChecked();
    expect(screen.getByTestId('label').getAttribute('style')).toEqual('pointer-events: none;');
  });

  it('fakeOnRateChange should be called when user input value was changed', async () => {
    render(
      <StarRating
        value={mockValue}
        title={mockTitle}
        isChecked={false}
        isDisabled={false}
        onRateChange={fakeOnRateChange}
      />
    );

    const inputElement = screen.getByRole('radio');

    await userEvent.click(inputElement);

    expect(fakeOnRateChange).toBeCalledTimes(1);
  });
});
