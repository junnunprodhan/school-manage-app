use super::super::students::schemas::Student;
use crate::database::Id;
use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn add_student_to_school(state: State<'_, TauriApp>, student_id: Id) -> Result<Id> {
    let admin = state.admin.lock().await;
    let id =
        super::services::add_student_to_school(admin.connection(), student_id, admin.school_id())
            .await?;

    Ok(id)
}

#[tauri::command]
pub async fn get_school_students(state: State<'_, TauriApp>) -> Result<Vec<Student>> {
    let admin = state.admin.lock().await;
    let students =
        super::services::get_school_students(admin.connection(), admin.school_id()).await?;

    Ok(students)
}

#[tauri::command]
pub async fn get_school_students_count(state: State<'_, TauriApp>) -> Result<usize> {
    let admin = state.admin.lock().await;
    let students =
        super::services::get_school_students(admin.connection(), admin.school_id()).await?;

    Ok(students.len())
}