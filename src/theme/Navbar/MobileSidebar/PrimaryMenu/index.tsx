/**
 * Custom MobileSidebar PrimaryMenu
 * 
 * Separates primary nav items from secondary/utility items in the mobile menu.
 * Primary items (left position) are displayed prominently at the top.
 * Secondary items (right position) are displayed below a separator with diminished styling.
 */
import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';

import styles from './styles.module.css';

function useNavbarItems() {
  return useThemeConfig().navbar.items as any[];
}

// Items to exclude from mobile menu entirely
const EXCLUDED_TYPES = [
  'custom-secondaryNavDropdown', // Dropdown only for intermediate desktop
];

// Swizzled from @docusaurus/theme-classic for custom mobile menu grouping
export default function NavbarMobilePrimaryMenu(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();

  // Filter out excluded items
  const visibleItems = items.filter(
    (item) => !EXCLUDED_TYPES.includes(item.type)
  );

  // Split into primary (left) and secondary (right) items
  const primaryItems = visibleItems.filter(
    (item) => item.position !== 'right'
  );
  const secondaryItems = visibleItems.filter(
    (item) => item.position === 'right'
  );

  return (
    <div className={styles.menuContainer}>
      {/* Primary navigation items */}
      <ul className="menu__list">
        {primaryItems.map((item, i) => (
          <NavbarItem
            mobile
            {...item}
            onClick={() => mobileSidebar.toggle()}
            key={`primary-${i}`}
          />
        ))}
      </ul>

      {/* Separator between primary and secondary items */}
      {secondaryItems.length > 0 && (
        <>
          <div className={styles.separator} />
          
          {/* Secondary/utility navigation items */}
          <ul className={`menu__list ${styles.secondaryList}`}>
            {secondaryItems.map((item, i) => (
              <NavbarItem
                mobile
                {...item}
                onClick={() => mobileSidebar.toggle()}
                key={`secondary-${i}`}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

