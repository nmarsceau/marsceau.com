package main

import (
	"math/rand"
	"syscall/js"
)

func main() {
	done := make(chan struct{}, 0)
	js.Global().Set("wasmRubiksMixup", js.FuncOf(rubiksMixup))
	<-done
}

func rubiksMixup(this js.Value, args []js.Value) interface{} {
	potentialMoves := [][]string{
		{"R", "R'", "L", "L'"},
		{"U", "U'", "D", "D'"},
		{"F", "F'", "B", "B'"},
	}

	turns := args[0].Int()
	if turns < 0 {
		turns = -turns // Convert negative values to positive
	}

	moves := []any{}
	for i := 0; i < turns; i++ {
		moveSet := potentialMoves[i%3]
		moves = append(moves, moveSet[rand.Intn(len(moveSet))])
	}

	return moves
}
