puts "HELLO"
=begin
require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'username-or-email.csv'))

csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')

csv.each do |row|

   u = User.create(name: row['First name'], email: row['Login email'])

   # u.name = row['First name']
   # u.email = row['Login email']

   # u.save

   # puts "#{u.name} saved"
   puts u

end

puts "There are now #{User.count} rows in the Users table."
=end