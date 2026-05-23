package db

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error

	DB, err = gorm.Open(sqlite.Open("clips.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	if err := migrate(); err != nil {
		log.Fatalf("Database connected and migrated successfully!")
	}
}

func migrate() error {
	return DB.AutoMigrate(&User{}, &Clip{})
}
