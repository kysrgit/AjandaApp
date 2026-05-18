## 2024-05-24 - Dynamic ARIA Labels
**Learning:** In dynamically generated views where elements are created via JavaScript string literals or `document.createElement`, it's critical to ensure explicit ARIA labels are added to icon-only buttons as they are not statically analyzable.
**Action:** Always inspect JS files for dynamically created interactive elements that lack text content.
