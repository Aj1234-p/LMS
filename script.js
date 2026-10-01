// Mock data
const courses = [
  {
    id: 1,
    title: "React Fundamentals",
    description:
      "Learn the basics of React development and build dynamic web applications.",
    instructor: "Jane Smith",
    duration: "8 weeks",
    students: 156,
    rating: 4.8,
    progress: 65,
    thumbnail: "⚛️",
    category: "Programming",
    lessons: [
      {
        id: 1,
        title: "Introduction to React",
        type: "video",
        duration: "15 min",
        completed: true,
      },
      {
        id: 2,
        title: "JSX and Components",
        type: "video",
        duration: "20 min",
        completed: true,
      },
      {
        id: 3,
        title: "State and Props",
        type: "video",
        duration: "25 min",
        completed: false,
      },
      {
        id: 4,
        title: "Event Handling",
        type: "quiz",
        duration: "10 min",
        completed: false,
      },
      {
        id: 5,
        title: "Final Project",
        type: "assignment",
        duration: "2 hours",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: "Python for Data Science",
    description:
      "Master Python programming for data analysis and machine learning.",
    instructor: "Mike Johnson",
    duration: "12 weeks",
    students: 203,
    rating: 4.9,
    progress: 30,
    thumbnail: "🐍",
    category: "Data Science",
    lessons: [
      {
        id: 1,
        title: "Python Basics",
        type: "video",
        duration: "30 min",
        completed: true,
      },
      {
        id: 2,
        title: "Data Structures",
        type: "video",
        duration: "45 min",
        completed: false,
      },
      {
        id: 3,
        title: "Pandas Introduction",
        type: "video",
        duration: "40 min",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description:
      "Create beautiful and functional user interfaces that users love.",
    instructor: "Sarah Wilson",
    duration: "6 weeks",
    students: 89,
    rating: 4.7,
    progress: 0,
    thumbnail: "🎨",
    category: "Design",
    lessons: [
      {
        id: 1,
        title: "Design Thinking",
        type: "video",
        duration: "25 min",
        completed: false,
      },
      {
        id: 2,
        title: "Color Theory",
        type: "video",
        duration: "20 min",
        completed: false,
      },
    ],
  },
];

const assignments = [
  {
    id: 1,
    title: "React Component Assignment",
    course: "React Fundamentals",
    dueDate: "2025-09-05",
    status: "pending",
  },
  {
    id: 2,
    title: "Data Analysis Project",
    course: "Python for Data Science",
    dueDate: "2025-09-10",
    status: "submitted",
  },
  {
    id: 3,
    title: "Design Portfolio",
    course: "UI/UX Design Principles",
    dueDate: "2025-09-15",
    status: "graded",
  },
];

let currentUser = null;

// Initialize the application
function init() {
  console.log("Initializing LMS application...");
  setupEventListeners();
  checkLoginStatus();
}

function setupEventListeners() {
  console.log("Setting up event listeners...");
  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
    console.log("Login form event listener attached");
  } else {
    console.error("Login form not found!");
  }

  // Navigation tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab");
      switchTab(tabName);
    });
  });
}

function handleLogin(e) {
  e.preventDefault();

  const role = document.getElementById("userRole").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Debug logging
  console.log("Login attempt:", { role, email, password });

  // Simple validation (in real app, this would be server-side)
  if (role && email && password) {
    console.log("Login successful, switching to LMS view");
    currentUser = {
      name: email
        .split("@")[0]
        .replace(".", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email: email,
      role: role,
      avatar: role === "student" ? "👨‍🎓" : role === "instructor" ? "👩‍🏫" : "👤",
    };

    // Hide login and show LMS
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("lmsSection").classList.remove("hidden");

    // Update user info
    document.getElementById("userName").textContent =
      `Welcome, ${currentUser.name}!`;
    document.getElementById("userAvatar").textContent = currentUser.avatar;

    // Update profile
    document.getElementById("profileName").textContent = currentUser.name;
    document.getElementById("profileEmail").textContent = currentUser.email;
    document.getElementById("profileRole").textContent =
      currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    // Load initial data
    loadCourses();
    loadAssignments();

    // Show success notification
    showNotification("Welcome to EduPlatform! Login successful.", "success");
  } else {
    console.log("Login failed - missing fields:", {
      role: !role,
      email: !email,
      password: !password,
    });
    alert(
      "Please fill in all fields:\n" +
        (!role ? "- Select your role\n" : "") +
        (!email ? "- Enter your email\n" : "") +
        (!password ? "- Enter your password" : ""),
    );
  }
}

function checkLoginStatus() {
  // In a real app, you'd check for stored auth tokens
  // For demo purposes, we'll just show the login
}

function logout() {
  currentUser = null;
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("lmsSection").classList.add("hidden");
  document.getElementById("loginForm").reset();
}

function switchTab(tabName) {
  // Update active tab
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");

  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.add("hidden");
  });

  // Show selected tab content
  document.getElementById(tabName).classList.remove("hidden");
}

function loadCourses() {
  const coursesGrid = document.getElementById("coursesGrid");
  coursesGrid.innerHTML = "";

  courses.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.className = "course-card";
    courseCard.innerHTML = `
                    <div class="course-header">
                        <div class="course-thumbnail">${course.thumbnail}</div>
                        <div class="course-title">${course.title}</div>
                        <div class="course-instructor">by ${course.instructor}</div>
                    </div>
                    <div class="course-body">
                        <div class="course-description">${course.description}</div>
                        <div class="course-meta">
                            <div class="meta-item">⏱️ ${course.duration}</div>
                            <div class="meta-item">👥 ${course.students} students</div>
                            <div class="meta-item">⭐ ${course.rating}</div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${course.progress}%"></div>
                        </div>
                        <div style="margin-bottom: 1rem; font-size: 0.9rem; color: #666;">
                            Progress: ${course.progress}%
                        </div>
                        <div class="course-actions">
                            <button class="btn btn-primary" onclick="viewCourse(${course.id})">
                                ▶️ Continue Learning
                            </button>
                            <button class="btn btn-secondary" onclick="showCourseInfo(${course.id})">
                                ℹ️ Info
                            </button>
                        </div>
                    </div>
                `;
    coursesGrid.appendChild(courseCard);
  });
}

function loadAssignments() {
  const assignmentsList = document.getElementById("assignmentsList");
  assignmentsList.innerHTML = "";

  assignments.forEach((assignment) => {
    const assignmentCard = document.createElement("div");
    assignmentCard.className = "assignment-card";

    const statusClass = `status-${assignment.status}`;
    const statusText =
      assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1);

    assignmentCard.innerHTML = `
                    <div class="assignment-header">
                        <div>
                            <div class="assignment-title">${assignment.title}</div>
                            <div class="assignment-course">${assignment.course}</div>
                        </div>
                        <div class="status-badge ${statusClass}">${statusText}</div>
                    </div>
                    <div class="due-date">
                        📅 Due: ${new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                `;
    assignmentsList.appendChild(assignmentCard);
  });
}

function viewCourse(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return;

  // Hide courses tab and show course detail
  document.getElementById("courses").classList.add("hidden");
  document.getElementById("courseDetail").classList.remove("hidden");

  const courseDetailContent = document.getElementById("courseDetailContent");
  courseDetailContent.innerHTML = `
                <div class="course-detail-header">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">${course.thumbnail}</div>
                    <div class="course-detail-title">${course.title}</div>
                    <div style="font-size: 1.2rem; opacity: 0.9;">Instructor: ${course.instructor}</div>
                    <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
                        <div>⏱️ ${course.duration}</div>
                        <div>👥 ${course.students} students</div>
                        <div>⭐ ${course.rating} rating</div>
                    </div>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h3 style="margin-bottom: 1rem;">📚 Course Lessons</h3>
                    <div class="lessons-list">
                        ${course.lessons
                          .map(
                            (lesson, index) => `
                            <div class="lesson-item" onclick="playLesson(${courseId}, ${lesson.id})">
                                <div class="lesson-info">
                                    <div class="lesson-icon ${lesson.type}">
                                        ${lesson.type === "video" ? "▶️" : lesson.type === "quiz" ? "❓" : "📝"}
                                    </div>
                                    <div class="lesson-details">
                                        <h4>${lesson.title}</h4>
                                        <div class="lesson-meta">
                                            <span>${lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}</span>
                                            <span>⏱️ ${lesson.duration}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="completion-status ${lesson.completed ? "completed" : "pending"}">
                                    ${lesson.completed ? "✅ Completed" : "⏳ Pending"}
                                </div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>

                <div class="dashboard-card">
                    <h3 style="margin-bottom: 1rem;">📊 Your Progress</h3>
                    <div class="progress-bar" style="margin-bottom: 1rem;">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                    <p style="color: #666;">You've completed ${course.progress}% of this course</p>
                </div>
            `;
}

function playLesson(courseId, lessonId) {
  const course = courses.find((c) => c.id === courseId);
  const lesson = course.lessons.find((l) => l.id === lessonId);

  if (lesson.type === "video") {
    alert(
      `🎬 Playing video: "${lesson.title}"\n\nDuration: ${lesson.duration}\n\nIn a real LMS, this would open a video player.`,
    );
  } else if (lesson.type === "quiz") {
    alert(
      `❓ Starting quiz: "${lesson.title}"\n\nDuration: ${lesson.duration}\n\nIn a real LMS, this would open a quiz interface.`,
    );
  } else if (lesson.type === "assignment") {
    alert(
      `📝 Opening assignment: "${lesson.title}"\n\nTime needed: ${lesson.duration}\n\nIn a real LMS, this would open an assignment submission form.`,
    );
  }

  // Mark lesson as completed (simulation)
  if (!lesson.completed) {
    lesson.completed = true;

    // Update progress
    const completedLessons = course.lessons.filter((l) => l.completed).length;
    course.progress = Math.round(
      (completedLessons / course.lessons.length) * 100,
    );

    // Refresh the course view
    viewCourse(courseId);

    // Show completion message
    setTimeout(() => {
      alert(
        `🎉 Congratulations! You've completed "${lesson.title}"!\n\nYour progress: ${course.progress}%`,
      );
    }, 1000);
  }
}

function backToCourses() {
  document.getElementById("courseDetail").classList.add("hidden");
  document.getElementById("courses").classList.remove("hidden");

  // Refresh courses to show updated progress
  loadCourses();
}

function showCourseInfo(courseId) {
  const course = courses.find((c) => c.id === courseId);
  alert(
    `📚 Course Information\n\n` +
      `Title: ${course.title}\n` +
      `Instructor: ${course.instructor}\n` +
      `Duration: ${course.duration}\n` +
      `Students: ${course.students}\n` +
      `Rating: ${course.rating}/5\n` +
      `Category: ${course.category}\n\n` +
      `${course.description}`,
  );
}

function showAddCourseForm() {
  const title = prompt("Enter course title:");
  if (!title) return;

  const instructor = prompt("Enter instructor name:");
  if (!instructor) return;

  const description = prompt("Enter course description:");
  if (!description) return;

  const newCourse = {
    id: courses.length + 1,
    title: title,
    description: description,
    instructor: instructor,
    duration: "6 weeks",
    students: 0,
    rating: 5.0,
    progress: 0,
    thumbnail: "📖",
    category: "General",
    lessons: [
      {
        id: 1,
        title: "Introduction",
        type: "video",
        duration: "15 min",
        completed: false,
      },
    ],
  };

  courses.push(newCourse);
  loadCourses();
  alert("✅ Course added successfully!");
}

// Add some interactive animations
function addInteractiveEffects() {
  // Add hover effects to cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  // Observe all cards for animation
  document.querySelectorAll(".dashboard-card, .course-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Add notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === "success" ? "#27ae60" : type === "error" ? "#e74c3c" : "#3498db"};
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add search functionality
function addSearchFeature() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "🔍 Search courses...";
  searchInput.style.cssText = `
                width: 300px;
                padding: 0.8rem 1rem;
                border: 2px solid #e0e0e0;
                border-radius: 25px;
                font-size: 1rem;
                margin-bottom: 2rem;
            `;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const courseCards = document.querySelectorAll(".course-card");

    courseCards.forEach((card) => {
      const title = card
        .querySelector(".course-title")
        .textContent.toLowerCase();
      const description = card
        .querySelector(".course-description")
        .textContent.toLowerCase();

      if (title.includes(query) || description.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Insert search box before courses grid
  const coursesTab = document.getElementById("courses");
  const coursesGrid = document.getElementById("coursesGrid");
  coursesTab.insertBefore(searchInput, coursesGrid);
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", () => {
  init();

  // Add search feature after a short delay
  setTimeout(() => {
    addSearchFeature();
    addInteractiveEffects();
  }, 1000);
});

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "1":
        e.preventDefault();
        switchTab("dashboard");
        break;
      case "2":
        e.preventDefault();
        switchTab("courses");
        break;
      case "3":
        e.preventDefault();
        switchTab("assignments");
        break;
    }
  }
});
