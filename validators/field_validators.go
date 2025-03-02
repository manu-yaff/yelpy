package validators

func IsValidString(s string) bool {
	if len(s) == 0 {
		return false
	}

	return true
}

func IsValidId(id string) bool {
	if len(id) == 22 {
		return true
	}

	return false
}
