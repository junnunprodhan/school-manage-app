// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use modules::{
    abouts, app, auth, class_students, class_subjects, classes, exam_marks, exam_subjects, exams,
    parents, school_classes, school_students, school_teachers, schools, student_attendences,
    student_parents, students, teachers,
};
use system::TauriApp;

mod config;
mod database;
mod error;
mod libs;
mod modules;
mod system;

#[tauri::command]
fn greet() -> String {
    format!("Hello!")
}

#[tokio::main]
async fn main() {
    let connection = database::connection().await.unwrap();

    tauri::Builder::default()
        .manage(TauriApp::new(connection))
        .invoke_handler(tauri::generate_handler![
            greet,
            // App
            app::tauri_app::init_app,
            // Auth
            auth::tauri_app::signup,
            auth::tauri_app::login,
            auth::tauri_app::logout,
            auth::tauri_app::auth_user,
            // School
            schools::tauri_app::get_school,
            schools::tauri_app::get_schools,
            // Teacher
            teachers::tauri_app::create_teacher,
            teachers::tauri_app::get_teacher,
            teachers::tauri_app::get_teachers,
            teachers::tauri_app::add_teacher,
            // SchoolTeacher
            school_teachers::tauri_app::add_teacher_to_school,
            school_teachers::tauri_app::get_school_teachers,
            school_teachers::tauri_app::get_school_teachers_count,
            // Class
            classes::tauri_app::create_class,
            classes::tauri_app::get_class,
            classes::tauri_app::get_classes,
            classes::tauri_app::add_class,
            // SchoolClass
            school_classes::tauri_app::add_class_to_school,
            school_classes::tauri_app::get_school_classes,
            school_classes::tauri_app::get_school_classes_count,
            // Student
            students::tauri_app::create_student,
            students::tauri_app::get_student,
            students::tauri_app::get_students,
            students::tauri_app::add_student,
            // SchoolStudent
            school_students::tauri_app::add_student_to_school,
            school_students::tauri_app::get_school_students,
            school_students::tauri_app::get_school_students_count,
            // ClassStudent
            class_students::tauri_app::add_student_to_class,
            class_students::tauri_app::get_class_students,
            class_students::tauri_app::get_all_student_with_class,
            class_students::tauri_app::get_student_class,
            // Parent
            parents::tauri_app::create_parent,
            parents::tauri_app::get_parent,
            parents::tauri_app::get_parents,
            parents::tauri_app::add_parent,
            // StudentParent
            student_parents::tauri_app::add_parent_to_student,
            student_parents::tauri_app::get_student_parents,
            student_parents::tauri_app::get_student_parents_of_class,
            // StudentAttendences
            student_attendences::tauri_app::create_student_attendence,
            student_attendences::tauri_app::take_student_attendences,
            student_attendences::tauri_app::get_class_attendences,
            student_attendences::tauri_app::get_student_attendences,
            student_attendences::tauri_app::update_student_attendence,
            student_attendences::tauri_app::update_student_attendences,
            student_attendences::tauri_app::is_class_attendences_taken,
            //
            abouts::tauri_app::create_about,
            abouts::tauri_app::get_about,
            //
            class_subjects::tauri_app::create_class_subject,
            class_subjects::tauri_app::get_class_subject,
            class_subjects::tauri_app::get_class_subjects,
            class_subjects::tauri_app::add_class_subjects,
            //
            exams::tauri_app::create_exam,
            exams::tauri_app::get_exam,
            exams::tauri_app::get_school_exams,
            exams::tauri_app::get_school_exams_count,
            exams::tauri_app::get_class_exams,
            //
            exam_subjects::tauri_app::create_exam_subject,
            exam_subjects::tauri_app::get_exam_subject,
            exam_subjects::tauri_app::get_exam_subjects,
            exam_subjects::tauri_app::add_exam_subjects,
            //
            exam_marks::tauri_app::create_exam_mark,
            exam_marks::tauri_app::get_exam_mark,
            exam_marks::tauri_app::get_student_exam_marks,
            exam_marks::tauri_app::get_class_subject_exam_marks,
            exam_marks::tauri_app::add_class_subject_exam_marks,
            exam_marks::tauri_app::update_exam_mark,
            exam_marks::tauri_app::update_class_subject_exam_marks,
            exam_marks::tauri_app::is_class_subject_exam_marks_added,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
