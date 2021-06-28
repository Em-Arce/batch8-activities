#require 'bigdecimal'
#require 'bigdecimal/util'

print "Please enter a number"
number = gets.chomp.to_f
x = number    # any assumed square of number
e = 0.000001  # tolerance limit allowed for diff between x and root
count = 0

while true
        count+=1
        quotient = number/x      # use big decimal in computation for better precision than float
        root = 0.5 * (x + quotient)   # the correct square root of number
        puts %(Iteration:"#{count}")
        puts %(The assumed square root: "#{x}")
        puts %(Root for current iteration:"#{root}")
        if (root - x).abs < e
                puts %(Square root for "#{number}" is "#{root.to_f}")
                break
        end
        puts %(Difference between assumed sqrt and root is "#{(root - x).abs.to_f}")
        x = root; # set assumed sqrt of number to be the current value of root
        puts %(New assumed square root: "#{x.to_f}")
end

if (root.to_f.round(6)*root.to_f.round(6)) == number
        puts %("#{number}" is a perfect square!)
else
        puts  %("#{number}" is not a perfect square!)
	puts %(Input is "#{number} and square is "#{root*root}")
end
