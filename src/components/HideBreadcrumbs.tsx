import { useEffect } from "react";

  export const HideBreadcrumbs: React.FC = () => {
    useEffect(() => {
        const hideBreadcrumbs = () => {
          const breadcrumbElements = document.querySelectorAll('.breadcrumbs');
          breadcrumbElements.forEach(element => {
            element.style.display = 'none';
          });
        };

        // Hide breadcrumbs on component mount
        hideBreadcrumbs();

        // Optionally, hide breadcrumbs again when the DOM changes
        // (e.g., if breadcrumbs are added dynamically)
        const observer = new MutationObserver(hideBreadcrumbs);
        observer.observe(document.body, { childList: true, subtree: true });

        // Clean up the observer when the component unmounts
        return () => observer.disconnect();
      }, []);

      return null; // This component doesn't render anything itself
  }