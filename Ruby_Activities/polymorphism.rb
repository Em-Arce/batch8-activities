#START OF POLYMORPHISM ASSIGNMENT
class Pokemon
	attr_accessor :name, :type, :strong, :weak
	def initialize(name, type, strong, weak)
		@name = name
		@type = type
		@strong = strong
		@weak = weak
	end
	def greet
		puts "I am known as #{name} of #{type} type/s."
	end
	def fight
		puts "I can easily defeat #{strong} type/s! I am easily defeated when I am against #{weak} types."
	end
end

class Dragon < Pokemon
	def greet
		puts "You dare to talk to the #{type} kind? This better be worth my time."
	end
	def fight
		puts "My kind whips #{strong} type/s while I can be wrecked by #{weak} type/s monsters. Tell anyone about my weakness and you will know my wrath."
	end
end

class Normal < Pokemon	
	def greet
		puts "Hi, I am #{name} from the #{type} type of monsters."
	end

	def fight
		puts "We are effective against #{strong} and ineffective against #{weak} monster types."
	end
end

RayQ = Dragon.new("Shiny Rayquaza", "Dragon and Flying Legendary Monster","Ground, Fighting, Bug, Fire, Water and Grass", "Ice, Dragon, Fairy and Rock") # https://bulbapedia.bulbagarden.net/wiki/Rayquaza_(Pok%C3%A9mon)#Type_effectiveness
puts "========START OF POLYMORPHISM ASSIGNMENT (1/2)=========="
puts RayQ.greet
puts RayQ.fight

blissful = Normal.new("Blissey", "Normal", "Ghost", "Fighting")
puts blissful.greet
puts blissful.fight

puts "========END OF POLYMORPHISM ASSIGNMENT (1/2)=========="

#END OF POLYMORPHISM ASSIGNMENT
#START OF DUCK TYPING ASSIGNMENT
class Psychic
	def say
		puts "Greetings from me, a monster of the Psychic kind."
	end

	def battle
		puts "I can crush Fighting and Poison types."
	end
end

class Fairy
	def say
		puts "Hello, I am a Fairy type."
	end

	def battle
		puts "Monsters of Dragon, Fighting and Dark kinds are easy kills for me."
	end
end 

class PokemonActivities
	attr_accessor :monsters
	def initialize
		@monsters = []
		psychic = Psychic.new()
		fairy = Fairy.new()
		@monsters.push(psychic)
		@monsters.push(fairy)
	end

	def say
		monsters.each do |monster|
			monster.say
			end		
	end

	def battle
		monsters.each do |monster|
			monster.battle
		end		
	end
end

puts "========START OF POLYMORPHISM ASSIGNMENT (2/2)=========="
activities = PokemonActivities.new
puts activities.say
puts activities.battle
puts "========END OF POLYMORPHISM ASSIGNMENT (2/2)=========="
#END OF DUCK TYPING ASSIGNMENT
#Notes for me:
#1. 2 pokemon monster types (2 objects) with 2 methods of same name but behave differently. PokemonActivities is the class which aggregates the methods of 2 objects.
#2. in PokemonActivities we create 2 instances of psychic and fairy objects and place in monsters array
#3. Achieve duck typing by doing say and battle which are also present in 2 objects.  
#4. There are 2 objects with 2 methods with same name but different behavior. No need to do _kindof? as both objects shares a public interface (same set of methods). Useful to make code cleaner by avoiding if else and switch
#5. Duck typing places importance on capabilities of object and less on its type (class). What object can do do and not what it is.
