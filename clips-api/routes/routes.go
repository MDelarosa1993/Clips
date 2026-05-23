package routes

import (
	"clips-api/handlers"
	"clips-api/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	// Health Check Route
	r.GET("/health", handlers.HealthHandler)

	// Authentication Routes
	r.POST("/login", handlers.LoginHandler)

	// Protected clips Routes
	clips := r.Group("/clips", middleware.AuthMiddleware())
	{
		clips.GET("/recent", handlers.GetRecentClips) // Get recent clips
		clips.GET("/user/:userID", handlers.GetAllClips)   // Get all clips for a user
		clips.GET("/:id", handlers.GetClipByID)       // Get a specific clip by ID
		clips.POST("/", handlers.CreateClip)          // Create a new clip
		clips.PUT("/:id", handlers.UpdateClip)        // Update a clip
		clips.DELETE("/:id", handlers.DeleteClip)     // Delete a clip
	}
}
