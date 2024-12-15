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

 	http.Handle("/src/", http.StripPrefix("/src/", http.FileServer(http.Dir("./src"))))
  http.Handle("/", http.FileServer(http.Dir("./examples/")))

  println("listening on :"+port)
  if err := http.ListenAndServe(":"+port, nil); err != nil {
    log.Fatalf("could not start server: %s\n", err)
  }
}
