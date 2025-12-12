package models

type Algorithm struct {
	ID              string `json:"id"`
	Name            string `json:"name"`
	Description     string `json:"description"`
	LongDescription string `json:"longDescription,omitempty"`
	InitialData     []int  `json:"initialData"`
}

type CodeBlock struct {
	ID           string `json:"id"`
	AlgorithmID  string `json:"algorithmId"`
	Order        int    `json:"order"`
	CodeSnippet  string `json:"codeSnippet"`
	Type         string `json:"type"`
	LogicID      string `json:"logicId"`
	CorrectLevel int    `json:"correctLevel"`
}

type AlgorithmWithBlocks struct {
	Algorithm  Algorithm   `json:"algorithm"`
	CodeBlocks []CodeBlock `json:"codeBlocks"`
}
