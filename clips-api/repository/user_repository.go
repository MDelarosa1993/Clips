package repository

import (
    "clips-api/db"
)

type UserRepository struct{}

func (r *UserRepository) GetUserByID(id uint) (*db.User, error) {
    var user db.User
    if err := db.DB.First(&user, "id = ?", id).Error; err != nil {
        return nil, err
    }
    return &user, nil
}