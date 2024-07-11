use super::super::{class_students, school_students};
use super::schemas::Student;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn create_student(
    state: State<'_, TauriApp>,
    name: &str,
    img: &str,
    about_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let student_id =
        super::services::create_student(admin.connection(), name, img, about_id).await?;

    Ok(student_id)
}

#[tauri::command]
pub async fn get_student(state: State<'_, TauriApp>, student_id: Id) -> Result<Student> {
    let admin = state.admin.lock().await;
    let student = super::services::get_student(admin.connection(), student_id).await?;

    Ok(student)
}

#[tauri::command]
pub async fn get_students(state: State<'_, TauriApp>) -> Result<Vec<Student>> {
    let admin = state.admin.lock().await;
    let students = super::services::get_students(admin.connection()).await?;

    Ok(students)
}

#[tauri::command]
pub async fn add_student(
    state: State<'_, TauriApp>,
    //
    name: &str,
    img: &str,
    // class
    class_roll: i32,
    class_id: Id,
    section: &str,
    section_roll: i32,
    year: i32,
    // about
    birth: &str,
    gender: &str,
    address: &str,
    number: &str,
    // login
    email: &str,
    password: &str,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let about_id = super::super::abouts::services::create_about(
        admin.connection(),
        birth,
        gender,
        address,
        number,
        email,
        password,
    )
    .await?;
    let student_id =
        super::services::create_student(admin.connection(), name, img, about_id).await?;

    school_students::services::add_student_to_school(
        admin.connection(),
        student_id,
        admin.school_id(),
    )
    .await?;

    class_students::services::add_student_to_class(
        admin.connection(),
        class_roll,
        section,
        section_roll,
        year,
        student_id,
        class_id,
    )
    .await?;

    Ok(student_id)
}
