defmodule Day1 do
  def parse_input(input) do
    input
    |> Enum.map(&String.trim/1)
    |> Enum.map(&String.to_charlist/1)
    |> Enum.flat_map(& &1)
  end

  def find_integer(input) do
    input
    |> Enum.map(fn x -> String.replace(x, ~r/\D/, "") end)
    |> Enum.map(fn x -> String.graphemes(x) end)
    |> Enum.map(fn x -> [List.first(x), List.last(x)] end)
    |> Enum.map(fn x -> x |> Enum.join() |> String.to_integer() end)
  end

  # Solution from
  # https://github.com/mexicat/aoc-2023/blob/main/lib/aoc/day_01.ex
  def replace_string_digits("one" <> rest), do: "1" <> replace_string_digits("e" <> rest)
  def replace_string_digits("two" <> rest), do: "2" <> replace_string_digits("o" <> rest)
  def replace_string_digits("three" <> rest), do: "3" <> replace_string_digits("e" <> rest)
  def replace_string_digits("four" <> rest), do: "4" <> replace_string_digits("r" <> rest)
  def replace_string_digits("five" <> rest), do: "5" <> replace_string_digits("e" <> rest)
  def replace_string_digits("six" <> rest), do: "6" <> replace_string_digits("x" <> rest)
  def replace_string_digits("seven" <> rest), do: "7" <> replace_string_digits("n" <> rest)
  def replace_string_digits("eight" <> rest), do: "8" <> replace_string_digits("t" <> rest)
  def replace_string_digits("nine" <> rest), do: "9" <> replace_string_digits("e" <> rest)

  def replace_string_digits(<<char, rest::binary>>),
    do: <<char>> <> replace_string_digits(rest)

  def replace_string_digits(""), do: ""

  def part1(input) do
    input
    |> Enum.map(&String.trim/1)
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
  end

  def part2(input) do
    input
    |> Enum.map(fn x -> x |> String.trim() |> replace_string_digits() end)
    |> find_integer()
    |> Enum.sum()
  end
end
