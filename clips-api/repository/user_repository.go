package repository

import (
	"clips-api/db"
	"errors"
)

type UserRepository struct{}

// CreateUser saves a new user to the database
func (r *UserRepository) CreateUser(user *db.User) error {
	// Check if the user already exists
	var existingUser db.User
	if err := db.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		return errors.New("user already exists")
	}

	// Save the new user
	if err := db.DB.Create(user).Error; err != nil {
		return err
	}

	return nil
}

// GetUserByEmail retrieves a user by their email
func (r *UserRepository) GetUserByEmail(email string) (*db.User, error) {
	var user db.User
	if err := db.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
