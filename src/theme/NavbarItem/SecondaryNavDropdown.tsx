import { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import ButtonLink from '../../components/ui/ButtonLink';

/**
 * SecondaryNavDropdown - Shows secondary nav items in a dropdown
 * at intermediate viewport sizes (md to xl, 997px - 1279px)
 * 
 * Breakpoints (matches Docusaurus default at 996px):
 *   < md  (< 997px)       : Mobile - hamburger menu, this component hidden
 *   md-xl (997px-1279px)  : Intermediate - this dropdown visible
 *   ≥ xl  (≥ 1280px)      : Desktop - full navbar, this component hidden
 */
export default function SecondaryNavDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div 
      ref={dropdownRef} 
      className="secondary-nav-dropdown navbar__item flex shrink-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="clean-btn navbar__link flex items-center gap-1"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        More
        <svg 
          className={`w-3 h-3 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="secondary-nav-dropdown__menu">
          <Link
            to="/docs/release-notes/"
            className="secondary-nav-dropdown__item"
            onClick={() => setIsOpen(false)}
          >
            Release Notes
          </Link>
          <Link
            to="/docs/support/"
            className="secondary-nav-dropdown__item"
            onClick={() => setIsOpen(false)}
          >
            Support
          </Link>
          <a
            href="https://library.gruntwork.io"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-nav-dropdown__item"
            onClick={() => setIsOpen(false)}
          >
            Library Search
            <svg 
              className="w-3 h-3 ml-1 inline-block opacity-60"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          {/* Sign In - only visible when navbar Sign In is hidden (narrow intermediate) */}
          <div className="secondary-nav-dropdown__divider secondary-nav-dropdown__signin-divider" />
          <ButtonLink
            href="https://app.gruntwork.io"
            variant="outline"
            size="sm"
            className="secondary-nav-dropdown__signin"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </ButtonLink>
        </div>
      )}
    </div>
  );
}

