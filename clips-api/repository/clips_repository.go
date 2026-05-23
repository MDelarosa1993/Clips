package repository

import (
	"clips-api/db"
)

type ClipRepository struct{}

func (r *ClipRepository) GetAllClipsByUserID(userID uint) ([]db.Clip, error) {
	var clips []db.Clip
	if err := db.DB.Where("user_id = ?", userID).Order("timestamp DESC").Find(&clips).Error; err != nil {
		return nil, err
	}
	return clips, nil
}

func (r *ClipRepository) GetClipByID(id uint) (*db.Clip, error) {
	var clip db.Clip
	if err := db.DB.First(&clip, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return &clip, nil
}

func (r *ClipRepository) CreateClip(clip *db.Clip) error {
	if err := db.DB.Create(clip).Error; err != nil {
		return err
	}
	return nil
}

func (r *ClipRepository) UpdateClip(clip *db.Clip) error {
	if err := db.DB.Save(clip).Error; err != nil {
		return err
	}
	return nil
}

func (r *ClipRepository) DeleteClip(id uint) error {
	if err := db.DB.Delete(&db.Clip{}, id).Error; err != nil {
		return err
	}
	return nil
}

func (r *ClipRepository) GetRecentClips(limit int) ([]db.Clip, error) {
	var clips []db.Clip
	if err := db.DB.Order("timestamp DESC").Limit(limit).Find(&clips).Error; err != nil {
		return nil, err
	}
	return clips, nil
}
