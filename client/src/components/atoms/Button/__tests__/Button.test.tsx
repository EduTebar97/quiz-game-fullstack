import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies secondary variant classes correctly', () => {
    const { container } = render(<Button variant="secondary">Secondary Button</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('bg-gray-200');
    expect(button).toHaveClass('hover:bg-gray-300');
    expect(button).toHaveClass('text-gray-800');
  });

  it('applies small size classes correctly', () => {
    const { container } = render(<Button size="sm">Small Button</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1');
    expect(button).toHaveClass('text-sm');
  });

  it('applies primary variant classes by default', () => {
    const { container } = render(<Button>Default Button</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('bg-blue-500');
    expect(button).toHaveClass('hover:bg-blue-600');
    expect(button).toHaveClass('text-white');
  });

  it('applies medium size classes by default', () => {
    const { container } = render(<Button>Default Size Button</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
    expect(button).toHaveClass('text-base');
  });

  it('includes common classes regardless of variant or size', () => {
    const { container } = render(<Button>Common Classes Button</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass('rounded-md');
    expect(button).toHaveClass('font-medium');
    expect(button).toHaveClass('transition-colors');
  });
});