package handlers

import (
	"clips-api/db"
	"clips-api/repository"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Initialize the ClipRepository
var clipRepo = repository.ClipRepository{}

// GetAllClips retrieves all clips for a specific user
func GetAllClips(c *gin.Context) {
	userIDParam := c.Param("userID")
	userID, err := strconv.Atoi(userIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	clips, err := clipRepo.GetAllClipsByUserID(uint(userID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch clips"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"clips": clips})
}

// GetClipByID retrieves a specific clip by its ID
func GetClipByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid clip ID"})
		return
	}

	clip, err := clipRepo.GetClipByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Clip not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"clip": clip})
}

// CreateClip creates a new clip for a specific user
func CreateClip(c *gin.Context) {
	var clip db.Clip
	if err := c.ShouldBindJSON(&clip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := clipRepo.CreateClip(&clip); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create clip"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Clip created", "clip": clip})
}

// UpdateClip updates an existing clip
func UpdateClip(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid clip ID"})
		return
	}

	clip, err := clipRepo.GetClipByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Clip not found"})
		return
	}

	if err := c.ShouldBindJSON(&clip); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := clipRepo.CreateClip(clip); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update clip"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Clip updated", "clip": clip})
}

// DeleteClip deletes a specific clip
func DeleteClip(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid clip ID"})
		return
	}

	if err := clipRepo.DeleteClip(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete clip"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Clip deleted", "id": id})
}

// GetRecentClips retrieves the most recent clips uploaded by all users
func GetRecentClips(c *gin.Context) {
	limitParam := c.DefaultQuery("limit", "10") // Default to 10 clips
	limit, err := strconv.Atoi(limitParam)
	if err != nil || limit <= 0 {
		limit = 10
	}

	clips, err := clipRepo.GetRecentClips(limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch recent clips"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"clips": clips})
}
