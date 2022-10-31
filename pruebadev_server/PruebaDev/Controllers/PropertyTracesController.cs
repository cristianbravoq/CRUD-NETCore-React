using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PruebaDev.Models;

namespace PruebaDev.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyTracesController : ControllerBase
    {
        private readonly WEBAPP_dbContext _context;

        public PropertyTracesController(WEBAPP_dbContext context)
        {
            _context = context;
        }

        // GET: api/PropertyTraces
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyTrace>>> GetPropertyTraces()
        {
            return await _context.PropertyTraces.ToListAsync();
        }

        // GET: api/PropertyTraces/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyTrace>> GetPropertyTrace(int id)
        {
            var propertyTrace = await _context.PropertyTraces.FindAsync(id);

            if (propertyTrace == null)
            {
                return NotFound();
            }

            return propertyTrace;
        }

        // PUT: api/PropertyTraces/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPropertyTrace(int id, PropertyTrace propertyTrace)
        {
            if (id != propertyTrace.IdPropertyTrace)
            {
                return BadRequest();
            }

            _context.Entry(propertyTrace).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropertyTraceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PropertyTraces
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PropertyTrace>> PostPropertyTrace(PropertyTrace propertyTrace)
        {
            _context.PropertyTraces.Add(propertyTrace);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPropertyTrace", new { id = propertyTrace.IdPropertyTrace }, propertyTrace);
        }

        // DELETE: api/PropertyTraces/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePropertyTrace(int id)
        {
            var propertyTrace = await _context.PropertyTraces.FindAsync(id);
            if (propertyTrace == null)
            {
                return NotFound();
            }

            _context.PropertyTraces.Remove(propertyTrace);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PropertyTraceExists(int id)
        {
            return _context.PropertyTraces.Any(e => e.IdPropertyTrace == id);
        }
    }
}
