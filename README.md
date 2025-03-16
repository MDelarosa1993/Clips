# Clips - Video Sharing Platform

## Overview

Clips is a **video-sharing platform** that allows users to **upload, manage, and share their video clips**. Built with **Angular 19+**, it features authentication, file handling, and real-time updates. Users can log in, upload videos, select thumbnails, and manage their clips easily.

## Features

**User Authentication** (Login/Register)  
**Video Upload** (MP4 format, drag & drop support)  
**Thumbnail Selection** (Generated via FFmpeg)  
**Clip Management** (Edit/Delete clips)  
**Real-time UI Updates**  
**Optimized Video Streaming (Video.js)**  

## Tech Stack

- **Angular 19+** - Frontend Framework  
- **FFmpeg** - Video Processing  
- **RxJS** - Reactive Programming  
- **Video.js** - Video Player  
- **NgxMask** - Input Formatting  

## Installation & Setup

### Step 1: Clone the Repository

```sh
git clone https://github.com/MDelarosa1993/clips.git
cd clips
```

### Step 2: Install Dependencies

```sh
npm install
```

### Step 3: Run the Development Server

```sh
ng serve
```

Your app should now be running at **[http://localhost:4200/](http://localhost:4200/)**

## How to Use the App

### Step 1: Register or Login

1. Click on **Login/Register** in the navigation bar
2. Enter your **email** and **password**
3. Click **Submit** to authenticate

### Step 2: Upload a Video

1. Navigate to the **Upload** page
2. Drag & Drop an MP4 file or select a file manually
3. Wait for the thumbnail to be generated
4. Click **Publish** to upload your video

### Step 3: Manage Your Clips

1. Go to the **Manage** page
2. Edit clip details (title, etc.)
3. Delete clips if needed
4. Sort videos by newest or oldest

### Step 4: Share and View Clips

1. Each video has a **unique sharable link**
2. Click on any clip to watch it
3. Share the link with others

## File Structure

```plaintext
src/
├── app/
│   ├── core/          # Navigation, shared components
│   ├── services/      # Authentication, FFmpeg services
│   ├── shared/        # Modals, alerts, input components
│   ├── video/         # Clip upload, listing, and management
│   ├── views/         # Home, About, Upload, Manage pages
│   ├── app.routes.ts  # Routing configuration
│   ├── app.component.ts  # Main app component
└── styles.css         # Global styles
```

## Troubleshooting

### 1. Common Issues

- If authentication does not work, ensure the backend service is running.
- If videos fail to upload, check file format and browser console for errors.

## Contributing

Contributions are welcome! 

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push to branch (`git push origin feature-name`)
5. Open a pull request

## License

This project is licensed under the **MIT License**.

---

## Future Improvements
- **The About Page**: Add a detailed explanation about the app.

- **Testing Integration**: Implement unit and end-to-end testing using **Karma** and **Jasmine** to ensure app reliability.

- **Performance Enhancements**: Optimize video streaming and lazy load components for a better user experience.

- **Dark Mode**: Add a dark mode option for better accessibility.

- **Mobile Optimization**: Improve UI responsiveness for a smoother mobile experience.

## What I Learned
- **Component-Based Architecture**: Learned how to structure an Angular application effectively.

- **State Management with RxJS**: Used observables and subjects for real-time UI updates.

- **Working with FFmpeg**: Gained experience in processing video files within an Angular app.

- **Routing & Lazy Loading**: Implemented dynamic route management and lazy-loaded modules for better performance.

- **Form Handling**: Improved skills in handling forms, validations, and real-time error feedback.

- **Signals & Directives**: Learned to use Angular signals and directives effectively.

- **Input & Output**: Gained experience working with Angular's input and output decorators for data binding.

- **Service-Based Architecture**: Utilized services for handling business logic and shared functionality. Also learned how to handle authentication within an Angular application.

