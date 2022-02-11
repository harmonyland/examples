export interface ExampleBodyElementComment {
  type: "comment";
  line: string;
}

export interface ExampleBodyElementCode {
  type: "code";
  line: string;
}

export type ExampleBodyElement =
  | ExampleBodyElementCode
  | ExampleBodyElementComment;

export interface Example {
  /**
   * Metadata defined using `///` comments.
   */
  metadata: Record<string, string>;
  body: ExampleBodyElement[];
}

export function parseExample(source: string) {
  const example: Example = {
    metadata: {},
    body: [],
  };

  source.split("\n").forEach((line) => {
    if (line.startsWith("///")) {
      const [key, ...value] = line.slice(3).trim().split(":");
      example.metadata[key] = value.join(":");
    } else if (line.startsWith("//")) {
      example.body.push({
        type: "comment",
        line,
      });
    } else {
      example.body.push({
        type: "code",
        line,
      });
    }
  });

  return example;
}
