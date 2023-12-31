import mysqldump from 'mysqldump';
import { mysqlConnectionOptions } from './mysql_connection.js';

export function createBackup(){
    try {  
        // dump the result straight to a file
        mysqldump({
            connection: mysqlConnectionOptions,
            dumpToFile: generateBackupFileName(),
        });
        console.log(`Backup completed successfully! Filename: ${backupFileName}`);
    } catch (error) {
        console.error('Error creating backup:', error);
    }
}

function generateBackupFileName(){
    // Generate current date in dd_mm_yy hh_mm_ss format
const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const year = currentDate.getFullYear().toString().slice(-2);
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');

const backupFileName = `./backups/${day}D_${month}M_${year}Y ${hours}h_${minutes}m_${seconds}s_backup.sql`;
return backupFileName;
}