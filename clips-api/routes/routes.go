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
		clips.GET("/", handlers.GetAllClips)
		clips.GET("/:id", handlers.GetClipByID)
		clips.POST("/", handlers.CreateClip)
		clips.PUT("/:id", handlers.UpdateClip)
		clips.DELETE("/:id", handlers.DeleteClip)
	}
}
