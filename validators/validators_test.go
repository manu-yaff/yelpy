package validators

import "testing"

func TestIsValidString(t *testing.T) {
	t.Run("is valid string", func(t *testing.T) {
		given := "tacos"
		got := IsValidString(given)
		want := true

		if got != want {
			t.Errorf("got %t but want %t given %q", got, want, given)
		}
	})

	t.Run("is valid not string", func(t *testing.T) {
		given := ""
		got := IsValidString(given)
		want := false

		if got != want {
			t.Errorf("got %t but want %t given %q", got, want, given)
		}
	})
}

func TestIsValidId(t *testing.T) {
	t.Run("is valid Id", func(t *testing.T) {
		given := "PgJV1wOtwTuoUz_n5Mcyxw"
		got := IsValidId(given)
		want := true

		if got != want {
			t.Errorf("got %t but want %t given %q", got, want, given)
		}
	})

	t.Run("is not valid ID", func(t *testing.T) {
		given := "1234567890"
		got := IsValidId(given)
		want := false

		if got != want {
			t.Errorf("got %t but want %t given %q", got, want, given)
		}
	})
}
