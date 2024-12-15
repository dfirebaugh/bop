package main

import (
  "os"
  "log"
  "net/http"
)

func main() {
	port := "3000"

	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}

  http.Handle("/", http.FileServer(http.Dir(".")))

  println("listening on :"+port)
  if err := http.ListenAndServe(":"+port, nil); err != nil {
    log.Fatalf("could not start server: %s\n", err)
  }
}
