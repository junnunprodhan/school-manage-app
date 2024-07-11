use super::SystemAdmin;
use crate::database::Connection;
use tokio::sync::Mutex;

// #[derive()]
pub struct TauriApp {
    pub admin: Mutex<SystemAdmin>,
}

impl TauriApp {
    pub fn new(connection: Connection) -> Self {
        let admin = SystemAdmin::new(connection);

        Self {
            admin: Mutex::new(admin),
        }
    }
}
