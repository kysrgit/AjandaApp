## 2024-06-01 - Global focus states are missing
**Learning:** Many interactive elements like buttons and inputs suppress default outlines but lack a `:focus-visible` style, hurting keyboard accessibility.
**Action:** Add a global `:focus-visible` style to `style.css` using `:is()` or `:where()` to ensure all interactive elements show a clear focus ring without using `!important`.
