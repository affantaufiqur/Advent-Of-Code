File.stream!("./day-1.txt", :line)
|> Stream.map(&String.trim/1)
|> Enum.map(fn x -> String.replace(x, ~r/\D/, "") end)
|> Enum.map(fn x ->
  String.graphemes(x)
  |> case do
    [h] -> [h, h]
    rest -> [List.first(rest), List.last(rest)]
  end
end)
|> Enum.map(&Enum.join/1)
|> Enum.map(&String.to_integer/1)
|> Enum.sum()
|> IO.inspect()
