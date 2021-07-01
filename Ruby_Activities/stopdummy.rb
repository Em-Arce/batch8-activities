the_word = "STOP"

loop do
	print "Please enter a word"
	case gets.chomp.upcase
	when ""
		puts "Input is empty. Please enter a word."
	when the_word
		puts "You got it! I will stop asking for a word."
		break
	else
		puts "It is not the word I am looking for."
	end
end

