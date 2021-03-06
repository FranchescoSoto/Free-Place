CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_users_email(email)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO users(email)
values ('u201821078@upc.edu.pe');

CREATE TABLE IF NOT EXISTS clients(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type ENUM ('P') NOT NULL DEFAULT 'P',
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  first_name VARCHAR(75) NULL,
  last_name VARCHAR(75) NULL,
  dni VARCHAR(8) NULL,
  PRIMARY KEY(id),
  UNIQUE INDEX UQ_clients_dni(dni),
  KEY IX_clients_created_by(created_by),
  KEY IX_clients_updated_by(updated_by),
  CONSTRAINT FK_clients_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_clients_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS reservations(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  number VARCHAR(15) NOT NULL,
  client_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  PRIMARY KEY (id),
  UNIQUE KEY UQ_reservations_number(number),
  KEY IX_reservations_client_id(client_id),
  KEY IX_reservations_created_by(created_by),
  KEY IX_reservations_updated_by(updated_by),
  CONSTRAINT FK_reservations_client_id FOREIGN KEY(client_id) REFERENCES clients(id),
  CONSTRAINT FK_reservations_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_reservations_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE IF NOT EXISTS adds(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type ENUM ('C','P') NOT NULL DEFAULT 'C',
  product_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
