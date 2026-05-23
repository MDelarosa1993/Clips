package db

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model         // Adds fields ID, CreatedAt, UpdatedAt, DeletedAt
	Email       string `gorm:"unique;not null"` // Email must be unique and not null
	Password    string `gorm:"not null"`        // Password is required
	Age         int    `gorm:"not null"`        // Age is required
	PhoneNumber string `gorm:"not null"`        // Phone number is required
	Name        string `gorm:"not null"`        // Name is required
}

type Clip struct {
	gorm.Model                   // Adds fields ID, CreatedAt, UpdatedAt, DeletedAt
	DocID              string    `gorm:"unique"`   // Optional unique document ID
	UID                string    `gorm:"not null"` // User ID (foreign key)
	DisplayName        string    `gorm:"not null"` // Display name of the user
	Title              string    `gorm:"not null"` // Title of the clip
	FileName           string    `gorm:"not null"` // File name of the clip
	ClipURL            string    `gorm:"not null"` // URL of the clip
	ScreenshotURL      string    `gorm:"not null"` // URL of the screenshot
	ScreenshotFilename string    `gorm:"not null"` // Screenshot file name
	Timestamp          time.Time `gorm:"not null"` // Timestamp of the clip
}
