package db

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email       string `gorm:"unique;not null"`   // Email must be unique
	Password    string `gorm:"not null"`          // Password is required
	Name        string `gorm:"not null"`          // User's name
	Age         int    `gorm:"not null"`          // User's age
	PhoneNumber string `gorm:"not null"`          // Phone number is required
	Clips       []Clip `gorm:"foreignKey:UserID"` // One-to-many relationship with Clip
}

type Clip struct {
    gorm.Model
    Title              string    `gorm:"not null"` // Title of the clip
    FileName           string    `gorm:"not null"` // File name of the clip
    ClipURL            string    `gorm:"not null"` // URL of the clip
    ScreenshotURL      string    `gorm:"not null"` // URL of the screenshot
    ScreenshotFilename string    `gorm:"not null"` // Screenshot file name
    Timestamp          time.Time `gorm:"not null"` // Timestamp of the clip
    UserID             uint      `gorm:"not null"` // Foreign key referencing User.ID
    User               User      `gorm:"foreignKey:UserID"` // Belongs to a User
}
