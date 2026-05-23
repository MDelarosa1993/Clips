package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllClips(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get all clips"})
}

func GetClipByID(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Get clip by ID", "id": id})
}

func CreateClip(c *gin.Context) {
	c.JSON(http.StatusCreated, gin.H{"message": "Clip created"})
}

func UpdateClip(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Clip updated", "id": id})
}

func DeleteClip(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{"message": "Clip deleted", "id": id})
}
