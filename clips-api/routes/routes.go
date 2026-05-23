package routes

import (
	"clips-api/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	// Health Check Route
	r.GET("/health", handlers.HealthHandler)

	// Clips Routes
	clips := r.Group("/clips")
	{
		clips.GET("/recent", handlers.GetRecentClips) // Get recent clips
		clips.GET("/user/:userID", handlers.GetAllClips)   // Get all clips for a user
		clips.GET("/:id", handlers.GetClipByID)       // Get a specific clip by ID
		clips.POST("/", handlers.CreateClip)          // Create a new clip
		clips.PUT("/:id", handlers.UpdateClip)        // Update a clip
		clips.DELETE("/:id", handlers.DeleteClip)     // Delete a clip
	}
}
