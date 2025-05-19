'use client';

import { ReactNode } from 'react';
import { trackClick, ClickCategories } from '@/utils/clickTracker';

interface TrackedButtonProps {
  children: ReactNode;
  category: string;
  label: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export default function TrackedButton({
  children,
  category,
  label,
  className,
  type = 'button',
  onClick,
  disabled = false,
  ...props
}: TrackedButtonProps) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call the original onClick handler if it exists
    if (onClick) {
      onClick(e);
    }

    // Track the click
    await trackClick(category, label);
  };

  return (
    <button
      type={type}
      className={className}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Specialized button components for common categories

export function NavButton({
  children,
  label,
  className,
  ...props
}: Omit<TrackedButtonProps, 'category'> & { label?: string }) {
  return (
    <TrackedButton
      category={ClickCategories.NAVIGATION}
      label={label || (typeof children === 'string' ? children : 'nav-button')}
      className={className}
      {...props}
    >
      {children}
    </TrackedButton>
  );
}

export function TicketButton({
  children,
  label,
  className,
  ...props
}: Omit<TrackedButtonProps, 'category'> & { label?: string }) {
  return (
    <TrackedButton
      category={ClickCategories.TICKETS}
      label={label || (typeof children === 'string' ? children : 'ticket-button')}
      className={className}
      {...props}
    >
      {children}
    </TrackedButton>
  );
}

export function ContactButton({
  children,
  label,
  className,
  ...props
}: Omit<TrackedButtonProps, 'category'> & { label?: string }) {
  return (
    <TrackedButton
      category={ClickCategories.CONTACT}
      label={label || (typeof children === 'string' ? children : 'contact-button')}
      className={className}
      {...props}
    >
      {children}
    </TrackedButton>
  );
}

export function OtherButton({
  children,
  label,
  className,
  ...props
}: Omit<TrackedButtonProps, 'category'> & { label?: string }) {
  return (
    <TrackedButton
      category={ClickCategories.OTHER}
      label={label || (typeof children === 'string' ? children : 'other-button')}
      className={className}
      {...props}
    >
      {children}
    </TrackedButton>
  );
}
