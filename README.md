# Vigann Digital ID Studio

A React app for creating a live-preview college ID card. "Digital ID" stays visible during a scroll-driven hex-tube intro, with short messages along the ride, followed by an editable front/back card builder with light and dark page themes. Student details stay in the browser.

## Run Locally

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build and `npm run lint` to check the source.

## Project Structure

```text
digital-id/
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- public/
|   `-- vigann.svg
`-- src/
    |-- App.jsx                 # Intro-to-builder flow and student state
    |-- Scene.jsx               # Three.js canvas and rolling intro scene
    |-- HexTube.jsx             # Hex tube mesh and scroll-driven camera rig
    |-- useTubeCurve.js         # Tube path
    |-- hexTexture.js           # Procedural repeating scale texture
    |-- index.css               # Intro, builder, card, and responsive styles
    |-- main.jsx                # React application entry point
    |-- components/
    |   |-- DigitalIDCard.jsx   # Reusable front/back card preview
    |   |-- StudentForm.jsx     # Controlled student details form
    |   |-- StudioSection.jsx   # Preview controls, themes, and download
    |   |-- studentData.js      # Sample, empty, and academic-year data
    |   |-- FeatureGrid.jsx     # Supporting UI component
    |   |-- HeroSection.jsx     # Supporting UI component
    |   |-- Navigation.jsx      # Supporting UI component
    |   |-- NfcScanModal.jsx    # Supporting UI component
    |   |-- ShareModal.jsx      # Supporting UI component
    |   |-- ShowcaseSection.jsx # Supporting UI component
    |   |-- StoryRoadmap.jsx    # Supporting UI component
    |   `-- ThreeBackground.jsx # Supporting Three.js component
    `-- utils/
        |-- downloadIDCard.js   # PNG card export
        `-- sound.js            # Audio helper
```

The active page flow is `App.jsx` -> `Scene.jsx` -> `StudioSection.jsx`. The standalone supporting components are retained under `src/components/` for reuse.
