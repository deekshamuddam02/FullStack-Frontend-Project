 let currentUser = null;
        let applications = [
            {
                id: 1,
                studentName: "Johnson",
                email: "john@email.com",
                program: "Computer Science",
                status: "pending",
                submitDate: "2024-01-15",
                gpa: "3.8"
            },
            {
                id: 2,
                studentName: "Nandini",
                email: "namdini@email.com",
                program: "ds",
                status: "pending",
                submitDate: "2024-01-12",
                gpa: "3.7"
            },
            {
                id: 3,
                studentName: "joe",
                email: "joe@email.com",
                program: "ai",
                status: "rejected",
                submitDate: "2024-01-08",
                gpa: "3.5"
            },
            {
                id: 4,
                studentName: "Eva",
                email: "eva@email.com",
                program: "ml",
                status: "pending",
                submitDate: "2024-01-18",
                gpa: "3.85"
            },
            {
                id: 5,
                studentName: "sukanya",
                email: "sukanya@email.com",
                program: "data science",
                status: "rejected",
                submitDate: "2025-01-20",
                gpa: "3.6"
            },
            {
                id: 6,
                studentName: "buvana",
                email: "buvana@email.com",
                program: "computer science",
                status: "approved",
                submitDate: "2025-01-22",
                gpa: "3.9"
            }
        ];
        let students = [
            { email: "john@email.com", password: "password", name: "Johnson", phone: "123-456-7890" }
        ];
        function switchTab(tab) {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            event.target.classList.add('active');    
            if (tab === 'student') {
                document.getElementById('studentAuth').classList.remove('hidden');
                document.getElementById('adminAuth').classList.add('hidden');
            } else {
                document.getElementById('studentAuth').classList.add('hidden');
                document.getElementById('adminAuth').classList.remove('hidden');
            }
        }
        function showStudentRegister() {
            document.getElementById('studentLogin').classList.add('hidden');
            document.getElementById('studentRegister').classList.remove('hidden');
        }
        function showStudentLogin() {
            document.getElementById('studentLogin').classList.remove('hidden');
            document.getElementById('studentRegister').classList.add('hidden');
        }
        function studentRegister() {
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const phone = document.getElementById('regPhone').value;
            const password = document.getElementById('regPassword').value;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address');
                return;
            }const phonePattern = /^\d{10}$/;
            if (!phonePattern.test(phone)) {
                alert('Please enter a valid phone number (e.g., 1234567890)');
                return;
            }
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(password)) {
                alert('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
                return;
            }
            const namePattern = /^[a-zA-Z\s]+$/;
            if (!namePattern.test(name)) {
                alert('Name can only contain letters and spaces');
                return;
            }
            if (!name || !email || !phone || !password) {
                alert('Please fill in all fields');
                return;
            }
            if (students.find(s => s.email === email)) {
                alert('Email already registered');
                return;
            }
            students.push({ email, password, name, phone });
            alert('Registration successful! Please login.');
            showStudentLogin();
        }
        function studentLogin() {
            const email = document.getElementById('studentEmail').value;
            const password = document.getElementById('studentPassword').value;
            const student = students.find(s => s.email === email && s.password === password);
            if (student) {
                currentUser = { type: 'student', data: student };
                showStudentDashboard();
            } else {
                alert('Invalid credentials');
            }
        }
        function adminLogin() {
            const id = document.getElementById('adminId').value;
            const password = document.getElementById('adminPassword').value;
            if (id === 'admin' && password === 'admin123') {
                currentUser = { type: 'admin', data: { name: 'Administrator' } };
                showAdminDashboard();
            } else {
                alert('Invalid admin credentials');
            }
        }
        function showStudentDashboard() {
            document.getElementById('authSection').classList.add('hidden');
            document.getElementById('studentDashboard').classList.remove('hidden');
            document.getElementById('studentWelcome').textContent = `Welcome back, ${currentUser.data.name}!`;
            loadStudentApplications();
        }
        function showAdminDashboard() {
            document.getElementById('authSection').classList.add('hidden');
            document.getElementById('adminDashboard').classList.remove('hidden');  
            loadAdminDashboard();
        }
        function loadStudentApplications() {
            const studentApps = applications.filter(app => app.email === currentUser.data.email);
            const historyList = document.getElementById('historyList');
            if (studentApps.length === 0) {
                historyList.innerHTML = '<p style="text-align: center; color: #6c757d;">No applications submitted yet.</p>';
                document.getElementById('studentApplications').textContent = '0';
                document.getElementById('applicationStatus').textContent = 'None';
            } else {
                document.getElementById('studentApplications').textContent = studentApps.length;
                document.getElementById('applicationStatus').textContent = studentApps[0].status.charAt(0).toUpperCase() + studentApps[0].status.slice(1);      
                historyList.innerHTML = studentApps.map(app => `
                    <div class="application-item">
                        <div class="application-info">
                            <h4>${app.program}</h4>
                            <p>Submitted: ${app.submitDate}</p>
                            <p>GPA: ${app.gpa}</p>
                        </div>
                        <span class="status-badge status-${app.status}">${app.status.toUpperCase()}</span>
                    </div>
                `).join('');
            }
        }
        function loadAdminDashboard() {
            const pending = applications.filter(app => app.status === 'pending').length;
            const approved = applications.filter(app => app.status === 'approved').length;
            const rejected = applications.filter(app => app.status === 'rejected').length;
            document.getElementById('totalApplications').textContent = applications.length;
            document.getElementById('pendingApplications').textContent = pending;
            document.getElementById('approvedApplications').textContent = approved;
            document.getElementById('rejectedApplications').textContent = rejected;
            const adminList = document.getElementById('adminApplicationsList');
            adminList.innerHTML = applications.map(app => `
                <div class="application-item">
                    <div class="application-info">
                        <h4>${app.studentName}</h4>
                        <p>Program: ${app.program}</p>
                        <p>Email: ${app.email}</p>
                        <p>GPA: ${app.gpa}</p>
                        <p>Submitted: ${app.submitDate}</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <span class="status-badge status-${app.status}">${app.status.toUpperCase()}</span>
                        ${app.status === 'pending' ? `
                            <button class="btn" style="padding: 5px 15px; width: auto;" onclick="updateStatus(${app.id}, 'approved')">Approve</button>
                            <button class="btn btn-secondary" style="padding: 5px 15px; width: auto;" onclick="updateStatus(${app.id}, 'rejected')">Reject</button>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        }
        function updateStatus(appId, newStatus) {
            const app = applications.find(a => a.id === appId);
            if (app) {
                app.status = newStatus;
                loadAdminDashboard();
                alert(`Application ${newStatus} successfully!`);
            }
        }
        function showApplicationForm() {
            document.getElementById('applicationFormContainer').classList.remove('hidden');
            document.getElementById('applicationHistory').classList.add('hidden');
        }
        function showApplicationHistory() {
            document.getElementById('applicationFormContainer').classList.add('hidden');
            document.getElementById('applicationHistory').classList.remove('hidden');
        }
        function submitApplication() {
            const form = document.getElementById('applicationForm');
            const formData = new FormData(form);

            const required = form.querySelectorAll('[required]');
            let isValid = true;
            required.forEach(field => {
                if (!field.value) {
                    field.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    field.style.borderColor = '#e9ecef';
                }
            }); 
            if (!isValid) {
                alert('Please fill in all required fields');
                return;
            }
            const newApp = {
                id: applications.length + 1,
                studentName: `${formData.get('firstName')} ${formData.get('lastName')}`,
                email: currentUser.data.email,
                program: form.program.options[form.program.selectedIndex].text,
                status: 'pending',
                submitDate: new Date().toISOString().split('T')[0],
                gpa: formData.get('gpa')
            };  
            applications.push(newApp);
            
            alert('Application submitted successfully!');
            form.reset();
            document.getElementById('applicationFormContainer').classList.add('hidden');
            loadStudentApplications();
        }
        function logout() {
            currentUser = null;
            document.getElementById('authSection').classList.remove('hidden');
            document.getElementById('studentDashboard').classList.add('hidden');
            document.getElementById('adminDashboard').classList.add('hidden');
            
            document.querySelectorAll('input').forEach(input => input.value = '');
            showStudentLogin();
        }
        document.addEventListener('DOMContentLoaded', function() {
            const fileInput = document.getElementById('transcripts');
            const fileUpload = fileInput?.parentElement;
            if (fileInput) {
                fileInput.addEventListener('change', function() {
                    if (this.files[0]) {
                        fileUpload.innerHTML = `<p>✅ ${this.files[0].name} uploaded</p>`;
                    }
                });
            }
        });
        showApplicationHistory();