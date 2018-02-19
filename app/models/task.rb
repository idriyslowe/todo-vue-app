class Task < ApplicationRecord
  def as_json
    {
      id: id,
      text: text,
      completed: completed
    }
  end
end
