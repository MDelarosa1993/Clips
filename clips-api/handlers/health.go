package handlers

import (
	"clips-api/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HealthHandler(c *gin.Context) {
	// Call the service layer for the health status
	status := services.GetHealthStatus()
	c.JSON(http.StatusOK, gin.H{"status": status})
}
