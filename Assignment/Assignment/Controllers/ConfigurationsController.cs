using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Assignment.Model;
using Assignment.Model.Assignment.Model;

namespace Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationsController : ControllerBase
    {
        private readonly IMongoCollection<Configuration> _configurationsCollection;

        public ConfigurationsController(IMongoClient client)
        {
            var database = client.GetDatabase("database");
            _configurationsCollection = database.GetCollection<Configuration>("configurations");
        }

        [HttpGet("{id}")]
        public IActionResult GetConfiguration(string id)
        {
            var configuration = _configurationsCollection.Find(c => c.Id == id).FirstOrDefault();
            if (configuration == null)
                return NotFound();

            return Ok(configuration.Data);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateRemark(string id, [FromBody] RemarkModel model)
        {
            var filter = Builders<Configuration>.Filter.Eq("_id", id);
            var update = Builders<Configuration>.Update.Set("Remark", model.Remark);
            var result = _configurationsCollection.UpdateOne(filter, update);

            if (result.ModifiedCount == 0)
                return NotFound();

            return Ok(new { message = "success" });
        }
    }
}
