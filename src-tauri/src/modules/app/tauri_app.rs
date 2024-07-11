use crate::error::Result;
use crate::system::TauriApp;
use tauri::State;

#[tauri::command]
pub async fn init_app(state: State<'_, TauriApp>) -> Result<()> {
    let mut admin = state.admin.lock().await;

    admin.set_version(1.0);

    Ok(())
}
