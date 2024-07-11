use super::super::students::schemas::Student;
use super::schemas::{StudentClass, StudentWithClass};
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn add_student_to_class(
    state: State<'_, TauriApp>,
    roll: i32,
    section: &str,
    section_roll: i32,
    year: i32,
    student_id: Id,
    class_id: Id,
) -> Result<Id> {
    let admin = state.admin.lock().await;
    let id = super::services::add_student_to_class(
        admin.connection(),
        roll,
        section,
        section_roll,
        year,
        student_id,
        class_id,
    )
    .await?;

    Ok(id)
}

#[tauri::command]
pub async fn get_class_students(state: State<'_, TauriApp>, class_id: Id, year: i32) -> Result<Vec<Student>> {
    let admin = state.admin.lock().await;
    let students = super::services::get_class_students(admin.connection(), class_id, year).await?;

    Ok(students)
}

#[tauri::command]
pub async fn get_all_student_with_class(
    state: State<'_, TauriApp>,
    class_id: Id,
    year: i32
) -> Result<Vec<StudentWithClass>> {
    let admin = state.admin.lock().await;
    let students =
        super::services::get_all_student_with_class(admin.connection(), class_id, year).await?;

    Ok(students)
}

#[tauri::command]
pub async fn get_student_class(state: State<'_, TauriApp>, student_id: Id, year: i32) -> Result<StudentClass> {
    let admin = state.admin.lock().await;
    let student_class = super::services::get_student_class(admin.connection(), student_id, year).await?;

    Ok(student_class)
}
