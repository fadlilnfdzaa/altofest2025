'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { trackClick, ClickCategories } from '@/utils/clickTracker';

interface TrackedLinkProps {
  href: string;
  children: ReactNode;
  category: string;
  label: string;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TrackedLink({
  href,
  children,
  category,
  label,
  className,
  target,
  rel,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call the original onClick handler if it exists
    if (onClick) {
      onClick(e);
    }

    // Track the click
    await trackClick(category, label, href);
  };

  // If it's an external link or has a target
  if (href.startsWith('http') || href.startsWith('https') || target === '_blank') {
    return (
      <a
        href={href}
        className={className}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  // If it's an internal link
  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

// Specialized link components for common categories

export function NavLink({
  href,
  children,
  label,
  className,
  ...props
}: Omit<TrackedLinkProps, 'category'> & { label?: string }) {
  return (
    <TrackedLink
      href={href}
      category={ClickCategories.NAVIGATION}
      label={label || (typeof children === 'string' ? children : `nav-${href}`)}
      className={className}
      {...props}
    >
      {children}
    </TrackedLink>
  );
}

export function TicketLink({
  href,
  children,
  label,
  className,
  ...props
}: Omit<TrackedLinkProps, 'category'> & { label?: string }) {
  return (
    <TrackedLink
      href={href}
      category={ClickCategories.TICKETS}
      label={label || (typeof children === 'string' ? children : `ticket-${href}`)}
      className={className}
      {...props}
    >
      {children}
    </TrackedLink>
  );
}

export function SocialLink({
  href,
  children,
  label,
  className,
  ...props
}: Omit<TrackedLinkProps, 'category'> & { label?: string }) {
  return (
    <TrackedLink
      href={href}
      category={ClickCategories.SOCIAL}
      label={label || (typeof children === 'string' ? children : `social-${href}`)}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </TrackedLink>
  );
}

export function ContactLink({
  href,
  children,
  label,
  className,
  ...props
}: Omit<TrackedLinkProps, 'category'> & { label?: string }) {
  return (
    <TrackedLink
      href={href}
      category={ClickCategories.CONTACT}
      label={label || (typeof children === 'string' ? children : `contact-${href}`)}
      className={className}
      {...props}
    >
      {children}
    </TrackedLink>
  );
}
