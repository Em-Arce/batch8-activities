require 'bigdecimal'
require 'bigdecimal/util'

print "Please enter a number"
number = gets.chomp.to_f
x = number    # any assumed square of number
e = 0.000001  # tolerance limit allowed for diff between x and root
count = 0

if number.negative?
	puts "#{number} is negative, it is not a perfect square."
elsif number.zero?
	puts "#{number} is a perfect square!"
elsif number.positive?  #use Newton Raphson Method to get square root instead of Math.sqrt: more precise for large numbers
	while true   # while the difference between the assumed square and root is not within e, continue iteration.
		count += 1
		quotient = number.to_d/x.to_d      # use big decimal in computation for better precision than float
		root = 0.5 * (x.to_d + quotient.to_d)   # calculate the correct square root of number
		puts "Iteration:#{count}"
		puts "The assumed square root: #{x.to_f.round(6)}"
		puts "Root for current iteration:#{root.to_f.round(6)}"
		if (root.to_d - x.to_d).abs < e  # check the difference between the assumed square and the root
			puts "Square root for #{number} is #{root.to_f.round(6)}"
			break
		end
		puts "Difference between assumed sqrt and root is #{(root - x).abs.to_f.round(6)}"
		x = root.to_d; # if difference does not fall within tolerance, set assumed sqrt of number to be the current value of root then repeat root calculation
		puts "New assumed square root: #{x.to_f.round(6)}"
	end
		if (root.to_d ** 2).to_f.round(6) == number && number.to_d / (root.to_d.to_f.round(6)) == root.to_d.to_f.round(6)
			puts "#{number} is a perfect square!"
		else
			puts "#{number} is not a perfect square."
		end
end
